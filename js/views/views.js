import { dataLoaded } from "../data.js";
import { updatePagination } from "./pagination.js";
import { updateTableHeader } from "./sort.js";
import { updateTable } from "./table.js";

export default function updateView(page) {
  updateTable(dataLoaded.get(page));
  updateTableHeader(dataLoaded.getSort());
  updatePagination(page, dataLoaded.getPagesCount());
}
