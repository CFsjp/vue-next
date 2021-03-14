// 原始 list 如下
const list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
]
// const result = convert(list, ...);

// // 转换后的结果如下
// let result = [
//     {
//       id: 1,
//       name: '部门A',
//       parentId: 0,
//       children: [
//         {
//           id: 3,
//           name: '部门C',
//           parentId: 1,
//           children: [
//             {
//               id: 6,
//               name: '部门F',
//               parentId: 3
//             }, {
//               id: 16,
//               name: '部门L',
//               parentId: 3
//             }
//           ]
//         },
//         {
//           id: 4,
//           name: '部门D',
//           parentId: 1,
//           children: [
//             {
//               id: 8,
//               name: '部门H',
//               parentId: 4
//             }
//           ]
//         }
//       ]
//     },
//   ···
// ];

function convert(list) {
  const result = []
  const map = {}
  list.forEach(item => {
    if (item.parentId === 0) {
      result.push(item)
    }
    map[item.id] = item
  })

  list.forEach(item => {
    if (item.parentId !== 0) {
      const parent = map[item.parentId]
      parent.children = parent.children || []
      parent.children.push(item)
    }
  })

  return result
}
