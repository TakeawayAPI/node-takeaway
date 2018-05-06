export default class TakeawayConfig {
    constructor({
        language = 'nl',
        url = 'https://nl.citymeal.com/android/android.php',
        password = '4ndro1d',
        version = '5.7',
        systemVersion = '24',
        appVersion = '4.15.3.2',
        appName = 'Takeaway.com'
    } = {}) {
        this.language = language;
        this.url = url;
        this.password = password;
        this.version = version;
        this.systemVersion = systemVersion;
        this.appVersion = appVersion;
        this.appName = appName;
    }

    getLanguage() {
        return this.language;
    }

    getUrl() {
        return this.url;
    }

    getPassword() {
        return this.password;
    }

    getDefaultQuery() {
        return `&version=${this.version}&systemversion=${this.systemVersion};${this.appVersion}&appname=${this.appName}&language=${this.language}`;
    }
};
