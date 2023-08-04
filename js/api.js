import { clearError, updateError } from './view/errors.js';
import { startLoading, stopLoading } from './view/loading.js';

const url =
  'http://www.filltext.com/?id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

const recordsMax = 32;

export function loadData({doBefore, doAfter}) {
  startLoading({ doBefore: clearError });
  if (doBefore) doBefore();

  try {
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
        updateError(error, { doAfter: stopLoading });
      })
      .finally(() => {
        stopLoading();
      });

  } catch(e) {
    // отлов ошибок загрузки axios
    setTimeout(() => {
      updateError(e, { doAfter: stopLoading });
    }, 500);
  }
}
