export const getQtyColor = (qty, side) => {
  let buyColorPalette = ["#40916c","#2d6a4f","#1b4332","#081c15"].reverse()
  let sellColorPalette = ["#ff4d6d", "#c9184a", "#a4133c", "#800f2f"].reverse()

  buyColorPalette = buyColorPalette.map((x,i) => [x, Number("10000" + "0".repeat(i))])
  sellColorPalette = sellColorPalette.map((x,i) => [x, Number("10000" + "0".repeat(i))])

  if(side === "buy") {
    for(let i = 0; i < buyColorPalette.length; i++) {
      if(qty < buyColorPalette[i][1]) return buyColorPalette[i][0]
    }
  }
  else if(side === "sell") {
    for(let i = 0; i < sellColorPalette.length; i++) {
      if(qty < sellColorPalette[i][1]) return sellColorPalette[i][0]
    }
  }
}