import React from 'react';
import PeopleApiService from '../../services/people-api-service'
import TokenService from '../../services/token-service'
class MainPage extends React.Component{
  state = {
    users: []
  }

  componentDidMount() {
    PeopleApiService.getAll()
      .then(res => {
        console.log(res);
        this.setState({users: res})
      })
  }

  startAdoption = (type) => {
    PeopleApiService.add(type)
    .then(res => {
      this.setState({
        adopted:true,
        pet: type==='cat'?this.state.cat:this.state.dog
      })
    })
  }

  submitUser = (e) => {
    e.preventDefault()
    const {name} = e.target
    PeopleApiService.add(name.value)
      .then(user => {
        TokenService.encodeUser(user)
        this.props.history.push('/main')
      })
  }

  render(){
    const listUsers = this.state.users.map(user => {
      return <li key={user.id}>{user.name}</li>
    })
    return (
      <div>
        <section><img src={require(`../../images/pets.jpg`)} alt='Pets' /></section>
        <section>
          <p>Welcome to Petful, here you will be able to adopt a new pet. You have to wait on the line until everyone has selected a pet, then you will able to select adopt option. You can select between a new dog or cat.</p>
          <p>You will be able to look at other pets on the list but you only will can adopt the first of the list.</p>
        </section>
        <section>
          <form onSubmit={this.submitUser}>
            <label forhtml='name'>I would like adopt, my name is
              <input id='name' type='text' required/>
            </label>
            <input type='submit' value='Start Adoption'/>
          </form>
        </section>


          {(this.state.users && this.state.users.length > 0) ? <section><p className='orange'>There are {this.state.users.length} pet lovers on the line</p>{listUsers}</section> : ''}

      </div>
    );
  }
}


export default MainPage;
