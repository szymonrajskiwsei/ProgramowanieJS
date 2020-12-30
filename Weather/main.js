class Weather {

    constructor(config) {

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


    async getData(city)
    {
        try{

            const url = `${this.API}&q=${city}`;

            const response = await fetch(url);
            const data = await response.json();
            this.data = data;
            this.prepareData()
            this.render();
            console.log(this.info)
            this.errors = ''

        } 
        catch(error)
        {
            console.log(`error in getData ${error}`)
            this.data = [];
            this.errors = 'elo'
        }

    }

    handleSubmit(event)
    {
        event.preventDefault();
        
        const inputText = document.querySelector(`input[name="city"]`);
        const city = inputText.value;
        this.city = city;
        inputText.value = '';
        this.appendStorage();
        this.getData(city)
    }

    prepareData()
    {
        const id = this.data.sys.id;
        const {name, weather, main} = this.data
        const description = weather[0]['description']
        const {feels_like, temp, temp_max, temp_min} = main;
        
        this.info = {id, name, description, feels_like, temp, temp_max, temp_min}
    }

    render()
    {
        const {description, feels_like, name, temp, temp_max, temp_min, id} = this.info;
        const template = `
                <div class="weatherCard" id="${name.toLowerCase()}">

                <div class="weatherCard__first">
                    <h3 class="weatherCard__name">
                        ${name}
                    </h3>
                    <p class="weatherCard__date">
                       
                    </p>
                    <p class="weatherCard__description">
                        ${description}
                    </p>
                    <p class="weatherCard__degrees">
                        <strong>${temp}</strong>
                        <span>C</span>
                    </p>
                </div>
                <div class="weatherCard__second">

                    <ul class="weatherCard__list">
                        <li class="weatherCard__list-item">
                            <span>Temperatura</span>
                            <strong>${temp}</strong>
                        </li>
                        <li class="weatherCard__list-item">
                            <span>Minimalna</span>
                            <strong>${temp_min}</strong>
                        </li>
                        <li class="weatherCard__list-item">
                            <span>Maksymalna</span>
                            <strong>${temp_max}</strong>
                        </li>
                    </ul>
                    <div class="weatherCard__delete">Usuń</div>
                </div>
            </div>

        `;
        
        document.querySelector(this.wrapper).insertAdjacentHTML('beforeend', template);
        console.log(this.errors)

        const errors = document.querySelector('.errors')
        this.errors ? errors.innerHTML = this.errors : errors.innerHTML = ''

    }

    handleResetBtn(e) {
        e.preventDefault()
        document.querySelector(this.wrapper).innerHTML = '';
        localStorage.removeItem('weather')
    }

    handleDeleteBtn(e, target)
    {
        const closestParent = target.closest('.weatherCard')
        const id = closestParent.id;
        document.querySelector('#app').removeChild(closestParent)

        const currentStorage = this.getStorage();
        if (currentStorage.cities)
        {
            console.log('tesssst')
            const newStorage = currentStorage.cities.filter(element => element !== id)
            localStorage.setItem('weather', JSON.stringify({cities: newStorage}))
        }
    }

    setListeners()
    {

        const formEl = document.querySelector(this.form)
        formEl.addEventListener('submit', (event) => this.handleSubmit(event) )

        const deleteBtn = document.querySelector('.weatherForm__delete');
        deleteBtn.addEventListener('click', (e) =>  this.handleResetBtn(e))

        const app = document.querySelector('#app');
        app.addEventListener('click', e => {
            const target = e.target;
            target.classList.contains('weatherCard__delete') ? this.handleDeleteBtn(e, target) : '';
        })

    }


    getStorage()
    {
        const storage = JSON.parse(localStorage.getItem('weather')) || {};
        return storage;
    }

    appendStorage()
    {
        const currentStorage = this.getStorage();
        if (currentStorage.cities)
        {
            currentStorage.cities.includes(this.city) ? null : currentStorage.cities.push(this.city.toLowerCase());
            localStorage.setItem('weather', JSON.stringify(currentStorage))
        }
        else
        {
            const newStorage = {cities: [this.city.toLowerCase()]}
            localStorage.setItem('weather', JSON.stringify(newStorage))
        }
    }

    init()
    {
        this.setListeners();
        this.storage = this.getStorage();
        
        if (this.storage.cities)
        {
            this.storage.cities.forEach(city => {
                this.getData(city)
            })
        }
    }
}

new Weather(
    {
        wrapper: '#app',
        form: '#weatherForm'
    }
)
