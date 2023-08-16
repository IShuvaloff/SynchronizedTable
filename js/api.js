import { MAX_RECORDS_LOADING } from './constants.js';
import { clearError, updateError } from './views/errors.js';
import { startLoading, stopLoading } from './views/loading.js';

const url =
  'http://www.filltext.com/?id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

export function loadData({doBefore, doAfter}) {
  startLoading({ doBefore: clearError });
  if (doBefore) doBefore();

  try {
    return axios
      .get(url, {
        params: {
          rows: MAX_RECORDS_LOADING,
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
