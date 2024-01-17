module.exports = () => {
  let toRemove = [], currentDate = new Date().getTime();

  for (let i = 0, j = localStorage.length; i < j; i++) {
    const key = localStorage.key(i),
      value = localStorage.getItem(key);

    if (value && value[0] === "{" && value.slice(-1) === "}") {
      const current = JSON.parse(value);
      if (current.expires && current.expires <= currentDate) {
        toRemove.push(key);
      }
    }
  }

  for (let i = toRemove.length - 1; i >= 0; i--) {
    localStorage.removeItem(toRemove[i]);
  }

}
