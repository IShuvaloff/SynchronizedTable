const url =
  'http://www.filltext.com/?id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

const recordsMax = 100;

export function loadData(callback) {
  return axios
    .get(url, {
      params: {
        rows: recordsMax,
      },
    })
    .then((response) => {
      if  (response?.data?.length) {
        callback(response.data);
      };
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log('нужно спрятать индикатор загрузки');
    });
}
