function createHexRandom () {
  var num = ''
  for (var i = 0; i < 64; i++) {
    var tmp = Math.floor(Math.random() * 16)
    if (tmp > 9) {
      switch (tmp) {
        case 10:
          num += 'a'
          break
        case 11:
          num += 'b'
          break
        case 12:
          num += 'c'
          break
        case 13:
          num += 'd'
          break
        case 14:
          num += 'e'
          break
        case 15:
          num += 'f'
          break
      }
    } else {
      num += tmp
    }
  }
  return num
}

function resolveUrl (to) {
  if (typeof to === 'string') return to
  if (to.name && !to.path) return to.name
  if (!to.query) return to.path
  var baseUrl = to.path + (to.path.indexOf('?') >= 0 ? '&' : '?')
  var args = []
  for (var x in to.query) {
    args.push(x + '=' + encodeURIComponent(to.query[x]))
  }
  return (baseUrl += args.join('&'))
}

export { createHexRandom, resolveUrl }
