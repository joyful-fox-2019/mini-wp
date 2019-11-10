module.exports = function ({ q }) {
  let keySearch = {}
  if (q) keySearch.$or = [{ tag: new RegExp(q, 'gi') }]
  return keySearch
}