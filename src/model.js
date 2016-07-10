import moment from "moment";

// =================================================================================================

export default class ToDo {
    /**
     * @see http://stackoverflow.com/a/2117523/2152076
     * @returns {string}
     */
    static uuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
    }
    constructor(data) {
        this.id = ToDo.uuid();
        this.title = data.title;
        this.isCompleted = data.isCompleted;
        this.expiration = data.expiration;
        this.isExpired = this.expiration.isBefore(moment());
        this.humanizedExpirationFromNow =
            moment.duration(this.expiration.diff(moment())).humanize(true);
    }
}
