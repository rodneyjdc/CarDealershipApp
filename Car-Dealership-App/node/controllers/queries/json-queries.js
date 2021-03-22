//actions, queries

module.exports = {
    add: function (arr, el) {
      return arr.concat(el);
    },
    upd: function (arr, body) {
      const itemToUpdate = arr.filter((item) => item.id === body.id)[0];
      if (!itemToUpdate) {
        console.log(`Can't find id ${body.id}`);
      }
      const nArr = arr.filter((item) => item.id !== body.id);
      return nArr.concat({ ...itemToUpdate, ...body });
    },
    del: function (arr, id) {
      const itemToDelete = arr.filter((item) => item.id == id)[0];
      if (!itemToDelete) {
        return `Can't find id ${id}`;
      }
      return arr.filter((item) => item.id != id);
    },
  };