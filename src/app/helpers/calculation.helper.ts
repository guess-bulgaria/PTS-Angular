export class CalculationHelper {
  static findAvg(arr: number[]): number {
    return arr.reduce((previousValue, currentValue) => previousValue + currentValue) / arr.length
  }

  static findMedian(array: number[]): number {
    if (array.length % 2 == 0) {
      const midIndex = array.length / 2;
      return (array[midIndex] + array[midIndex + 1]) / 2;
    }

    return array[(array.length + 1) / 2];
  }

  static findMode(array: number[]): number[] | undefined {
    if (array.length == 0)
      return undefined;
    let modeMap: Map<number, number> = new Map();
    let maxCount = 1;

    for (let i = 0; i < array.length; i++) {
      let el = array[i];
      let value = modeMap.get(el) || 0;
      modeMap.set(el, ++value);

      if (value && value > maxCount) maxCount = value;
    }

    let maxElements = [];
    for (let [key, value] of modeMap.entries())
      if (value == maxCount)
        maxElements.push(key);

    return maxElements;
  }

  static findScope(array: number[]): number {
    return array[array.length - 1] - array[0];
  }

  static calculateVariance(array: number[]) {
    const average = CalculationHelper.findAvg(array);

    const squareDiffs = array.map((value) => {
      const diff = value - average;
      return diff * diff;
    });
    return CalculationHelper.findAvg(squareDiffs);
  };

  static calculateSD(variance: number) {
    return Math.sqrt(variance);
  };

  static calculateCorrelations(x: number[], y: number[]) {
    let sumX = 0,
      sumY = 0,
      sumXY = 0,
      sumX2 = 0,
      sumY2 = 0;
    const minLength = x.length = y.length = Math.min(x.length, y.length);
    x.forEach((xi: number, idx: number) => {
      const yi = y[idx];
      sumX += xi;
      sumY += yi;
      sumXY += xi * yi;
      sumX2 += xi * xi;
      sumY2 += yi * yi;
    });
    return (minLength * sumXY - sumX * sumY) / Math.sqrt((minLength * sumX2 - sumX * sumX) * (minLength * sumY2 - sumY * sumY));
  }
}
