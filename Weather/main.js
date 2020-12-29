class Weather
{
    constructor(config)
    {
        const {wrapper, form} = config;
        this.wrapper = wrapper;
        this.form = form;

        this.data = [];
        this.API = `http://api.openweathermap.org/data/2.5/weather?APPID=50d53005c0fd5f556bb4ef15224c4209&lang=pl&units=metric`

        if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll))
        {
            this.init()
        }
        else
        {
            document.addEventListener("DOMContentLoaded", () => this.init());
        }
    }

    init()
    {

        
    }
}
