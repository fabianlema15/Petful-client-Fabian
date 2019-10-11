import config from '../config'

const GenericApiService = {
  get(type) {
      return fetch(`${config.REACT_APP_API_BASE}/${type}`, {
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },

  remove(type) {
    return fetch(`${config.REACT_APP_API_BASE}/${type}`, {
      method: 'DELETE'
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  next(type, id) {
    return fetch(`${config.REACT_APP_API_BASE}/${type}/next/${id}`, {
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  prev(type, id) {
    return fetch(`${config.REACT_APP_API_BASE}/${type}/prev/${id}`, {
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

}

export default GenericApiService;
