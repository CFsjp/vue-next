// 最长不重复子串

const lengthOfLongestSubstring = s => {
  let m = ''
  let res = 0
  for (let i = 0; i < s.length; i++) {
    if (m.indexOf(s[i]) == -1) {
      m += s[i]
    } else {
      res = res < m.length ? m.length : res
      m += s[i]
      m = m.slice(m.indexOf(s[i]) + 1)
    }
  }
  res = res < m.length ? m.length : res
  return res || s.length
}

lengthOfLongestSubstring('aaaaaaaa')
