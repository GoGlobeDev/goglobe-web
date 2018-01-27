/**
 * Created by zhuzhiyong on 16-10-18.
 */
export function hidenalert() {
    this.setState({ alerttext: '' });
    this.forceUpdate();
}

export function showAlert(alerttext) {
    this.setState({ alerttext: alerttext });
    this.forceUpdate();
    setTimeout(() => hidenalert.bind(this)(), 5000);
}
