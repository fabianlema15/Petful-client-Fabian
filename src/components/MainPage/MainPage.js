import React from 'react';
import PetsApiService from '../../services/pets-api-service'
import TokenService from '../../services/token-service'
import PeopleApiService from '../../services/people-api-service'
import Pet from '../Pet/Pet'
import './MainPage.css'


class MainPage extends React.Component{
  state = {
    users:[],
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
    const idUser = TokenService.decodeUser();
    if (idUser) {
      Promise.all([PeopleApiService.getFrontOfMe(idUser.id), PetsApiService.get('cat'), PetsApiService.get('dog')])
      .then(res => this.setState({cat: res[1], dog: res[2], users: res[0], adoptionEnabled:res[0].length>0?false:true}))
    }else{
      this.props.history.push('/')
    }
  }

  adoptAction = (type) => {
    PetsApiService.remove(type)
    .then(res => {
      this.setState({
        adopted:true,
        pet: type==='cat'?this.state.cat:this.state.dog
      })
    })
  }

  nextAction = (type, id) => {
    PetsApiService.next(type, id)
    .then(res => {
      if (Object.keys(res).length > 0){
        type==='cat' ? this.setState({cat: res, catPrevEnabled:true}) : this.setState({dog: res, dogPrevEnabled:true})
      }else {
        type==='cat' ? this.setState({catNextEnabled: false}) : this.setState({dogNextEnabled: false})
      }
    })
  }

  prevAction = (type, id) => {
    PetsApiService.prev(type, id)
    .then(res => {
      if (Object.keys(res).length > 0){
        type==='cat' ? this.setState({cat: res, catNextEnabled:true}) : this.setState({dog: res, dogNextEnabled:true})
      }else {
        type==='cat' ? this.setState({catPrevEnabled: false}) : this.setState({dogPrevEnabled: false})
      }
    })
  }

  goLanding = () => {
    this.props.history.push('/')
  }

  render(){
    const listUsers = this.state.users.map(user => {
      return <li key={user.id}>{user.name}</li>
    })
    return (
      <div>
        <section>
          <h2>Here are the pets for adoption</h2>
        </section>
        {
          !this.state.adopted?

          <div>
          <section>
          {(!this.state.adoptionEnabled && this.state.users.length>0) ?
            <div><h5 className='orange'>There are {this.state.users.length} pet lovers on the line</h5>
            {listUsers}</div>
            :
            <h5 className='green'>You are able to adopt now</h5>
          }
          </section>

          <section className="pet-desc">
          { Object.keys(this.state.cat).length>0? <div  >
              <Pet pet={this.state.cat}/>
              <div>
                  <button disabled={!this.state.adoptionEnabled} onClick={(e) => this.adoptAction('cat')}>Adopt {this.state.cat.name}</button>
              </div>
              {!this.state.adoptionEnabled && <div>
                <button disabled={!this.state.catPrevEnabled} onClick={(e) => this.prevAction('cat', this.state.cat.id)}>Previous Cat</button>
                <button disabled={!this.state.catNextEnabled} onClick={(e) => this.nextAction('cat', this.state.cat.id)}>Next Cat</button>
              </div>}
            </div> : <h4>There are not cats availables</h4>
          }

          </section>
          <section className="pet-desc">

          { Object.keys(this.state.dog).length>0? <div>
            <Pet pet={this.state.dog}/>
            <div>
                <button disabled={!this.state.adoptionEnabled} onClick={(e) => this.adoptAction('dog')}>Adopt {this.state.dog.name}</button>
            </div>
            {!this.state.adoptionEnabled && <div>
              <button disabled={!this.state.dogPrevEnabled} onClick={(e) => this.prevAction('dog', this.state.dog.id)}>Previous Dog</button>
              <button disabled={!this.state.dogNextEnabled} onClick={(e) => this.nextAction('dog', this.state.dog.id)}>Next Dog</button>
            </div>}
            </div> : <h4>There are not dogs availables</h4>
          }
          </section>

          </div>

          :
          <section className="pet-desc">
            <p>Thanks, you have adopted</p>
            <Pet pet={this.state.pet}/>

            <button onClick={this.goLanding} >Go to main page</button>

          </section>
        }

      </div>
    );
  }
}


export default MainPage;
