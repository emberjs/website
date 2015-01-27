module ColumnBalancer
  class << self
    def registered(app)
      app.helpers Helpers
    end
    alias :included :registered
  end

  module Helpers
    def balance(groups, columns)
      item_counts = groups.map { |k, v| v.count }
      output = Array.new(columns) { Hash.new }
      c = 0

      while c < columns - 1 && groups.count > 1 do
        ideal = groups.values.flatten.count / (columns - c)
        index_high, index_low, i = item_counts[1] + item_counts[0], item_counts[0], 1
        while index_high < ideal do
          index_high += item_counts[i + 1]
          index_low += item_counts[i]
          i += 1
        end

        index = (index_high - ideal).abs < (index_low - ideal).abs ? i + 1 : i
        column = groups.first(index).map { |arr| { arr[0] => arr[1] } }.reduce(:merge)

        output[c] = column

        groups = groups.drop(index).map { |arr| { arr[0] => arr[1] } }.reduce(:merge)
        item_counts = item_counts.drop(index)
        c += 1
      end

      output[c] = groups
      return output
    end
  end
end

::Middleman::Extensions.register(:column_balancer, ColumnBalancer)
