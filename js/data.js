export let dataLoaded = {
  records: [],
  set(data) {
    if (!data || !Array.isArray(data) || !data.length) return false;

    this.records = data;
    console.log(this.records);

    return true;
  }
}