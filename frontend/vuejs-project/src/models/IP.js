export default class IP {
    constructor(id, ip, accessible, hostname, ping_temps_ms, date_de_verification, date_de_modification) {
        this.id = id;
        this.ip = ip;
        this.accessible = accessible;
        this.hostname = hostname;
        this.ping_temps_ms = ping_temps_ms;
        this.date_de_verification = date_de_verification;
        this.date_de_modification = date_de_modification;
    }
}