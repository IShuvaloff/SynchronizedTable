import { startLoading, stopLoading } from './loading.js';

const url =
  'http://www.filltext.com/?id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

const recordsMax = 34;

export function loadData({doBefore, doAfter}) {
  startLoading();
  if (doBefore) doBefore();

  return axios
    .get(url, {
      params: {
        rows: recordsMax,
      },
    })
    .then((response) => {
      if (response?.data?.length) {
        if (doAfter) doAfter(response.data);
      };
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      stopLoading();
    });
}
