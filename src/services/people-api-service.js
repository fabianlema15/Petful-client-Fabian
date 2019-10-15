import config from '../config'

const PeopleApiService = {
  getAll() {
      return fetch(`${config.REACT_APP_API_BASE}/people`, {
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },

  getFrontOfMe(id) {
        return fetch(`${config.REACT_APP_API_BASE}/people/frontme/${id}`, {
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
      },

  add(name) {
    return fetch(`${config.REACT_APP_API_BASE}/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({name}),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  remove(type) {
    return fetch(`${config.REACT_APP_API_BASE}/people`, {
      method: 'DELETE'
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

}

export default PeopleApiService;
