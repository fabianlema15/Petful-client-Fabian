import React from 'react';
import Api from '../../services/api'
import Pet from '../Pet/Pet'
import Utils from '../../utils/utils'
import './MainPage.css'

class MainPage extends React.Component{
  state = {
    dog: {},
    cat: {},
    adoptionEnabled: false,
    catNextEnabled: true,
    catPrevEnabled: false,
    dogNextEnabled: true,
    dogPrevEnabled: false,
    adopted: false,
    pet: {}
  }

  componentDidMount() {
    const customerQueue = Utils.generateFakeQueue();
    setInterval(this.setUsersTime, 1000)
    Promise.all([Api.get('cat'), Api.get('dog')])
    .then(res => this.setState({cat: res[0], dog: res[1], users: customerQueue.users, time: customerQueue.time, each: customerQueue.each}))
  }

  setUsersTime = (users, time) => {
    this.state.time--
    if (this.state.time > 0 && this.state.time % 5 === 0){
      let usersWaiting = Math.floor(this.state.time / this.state.each);
      if (usersWaiting===0) usersWaiting = 1
      this.setState({users: usersWaiting, time: this.state.time})
    }
    if (this.state.time===0){
      Promise.all([Api.get('cat'), Api.get('dog')])
      .then(res => this.setState({cat: res[0],
        dog: res[1],
        adoptionEnabled: true,
        catNextEnabled: false,
        catPrevEnabled: false,
        dogNextEnabled: false,
        dogPrevEnabled: false
      }))
    }
  }

  adoptAction = (type) => {
    Api.remove(type)
    .then(res => {
      this.setState({
        adopted:true,
        pet: type==='cat'?this.state.cat:this.state.dog
      })
    })
  }

  nextAction = (type, id) => {
    Api.next(type, id)
    .then(res => {
      if (Object.keys(res).length > 0){
        type==='cat' ? this.setState({cat: res, catPrevEnabled:true}) : this.setState({dog: res, dogPrevEnabled:true})
      }else {
        type==='cat' ? this.setState({catNextEnabled: false}) : this.setState({dogNextEnabled: false})
      }
    })
  }

  prevAction = (type, id) => {
    Api.prev(type, id)
    .then(res => {
      if (Object.keys(res).length > 0){
        type==='cat' ? this.setState({cat: res, catNextEnabled:true}) : this.setState({dog: res, dogNextEnabled:true})
      }else {
        type==='cat' ? this.setState({catPrevEnabled: false}) : this.setState({dogPrevEnabled: false})
      }
    })
  }

  render(){
    return (
      <div>
        <h1>Here are the pets for adoption</h1>
        <h3>Welcome to Petful, here you will be able to adopt a new pet. You have to wait on the line until everyone has selected a pet, then you will able to select adopt option. You can select between a new dog or cat.</h3>
        <h3>You will be able to look at other pets on the list but you only will can adopt the first of the list.</h3>
        {
          !this.state.adopted? <div>{!this.state.adoptionEnabled ?
            <h4 className='orange'>There are {this.state.users} pet lovers on the line, Time estimated to wait {this.state.time} second</h4>:
            <h4 className='green'>You are able to adopt now</h4>
          }

          { Object.keys(this.state.cat).length>0? <div className="pet-desc" >
              <Pet pet={this.state.cat}/>
              <div>
                  <button disabled={!this.state.adoptionEnabled} onClick={(e) => this.adoptAction('cat')}>Adopt</button>
              </div>
              <div>
                <button disabled={!this.state.catPrevEnabled} onClick={(e) => this.prevAction('cat', this.state.cat.id)}>Previus</button>
                <button disabled={!this.state.catNextEnabled} onClick={(e) => this.nextAction('cat', this.state.cat.id)}>Next</button>
              </div>
            </div> : <h2>There are not cats availables</h2>
          }


          { Object.keys(this.state.dog).length>0? <div className="pet-desc" >
            <Pet pet={this.state.dog}/>
            <div>
                <button disabled={!this.state.adoptionEnabled} onClick={(e) => this.adoptAction('dog')}>Adopt</button>
            </div>
            <div>
              <button disabled={!this.state.dogPrevEnabled} onClick={(e) => this.prevAction('dog', this.state.dog.id)}>Previus</button>
              <button disabled={!this.state.dogNextEnabled} onClick={(e) => this.nextAction('dog', this.state.dog.id)}>Next</button>
            </div>
            </div> : <h2>There are not dogs availables</h2>
          }
          </div>
          :
          <div className="pet-desc">
            <h2>Thanks, you have adopted</h2>
            <Pet pet={this.state.pet}/>

          </div>
        }

      </div>
    );
  }
}


export default MainPage;
