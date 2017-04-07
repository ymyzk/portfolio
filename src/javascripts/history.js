import createBrowserHistory from "history/createBrowserHistory";
import createMemoryHistory from "history/createMemoryHistory";

// TODO: モックの代わりに server-side で memory history を使用
const history = __CLIENT__ ? createBrowserHistory() : createMemoryHistory();

export default history;
