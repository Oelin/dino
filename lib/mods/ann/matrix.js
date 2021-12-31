class matrix {

  constructor(rows, columns) {
    this.rows = rows
    this.columns = columns
    this.data = Array(rows).fill(0).map(() => Array(columns).fill(0).map(() => 2 * Math.random() - 1))
  }

  apply(f) {
    for (let i=0; i < this.rows; i++) {
      for (let j=0; j < this.columns; j++) {
        this.data[i][j] = f(this.data[i][j], i, j)
      }
    }
  }

  increase(scalar) {
    this.apply(x => x + scalar)
  }

  scale(scalar) {
    this.apply(x => x * scalar)
  }

  add(other) {
    this.apply((x, i, j) => x + other[i][j])
  }

  dot(other) {
    this.data = this.data.map((row, i) =>
        other.data[0].map((_, j) =>
          row.reduce((acc, _, n) => acc + this.data[i][n] * other.data[n][j], 0)
        )
      )
  }

  copy() {
    let c = new matrix(this.rows, this.columns)
    c.data = JSON.parse(JSON.stringify(this.data))

    return c
  }
}

export default matrix
