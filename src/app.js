import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function SaveItem({match}) {
    fetch('https://5c9017798447f30014cb83b1.mockapi.io/book/v1/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: match.params.name,
            author: match.params.author,
            publisher: match.params.publisher,
            detail: match.params.detail,
        })

    })

    return <div>Successfully added!<br/><div><Link to="/" >Back to homepage</Link></div></div>
}

function About() {
    return <div>NUEVO YAZILIM ÇÖZÜMLERİ A.Ş. için Ali Yaman tarafından hazırlanmıştır.</div>
}
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            name:"",
            author:"",
            publisher:"",
            id:null,
            value:null,
            detailData:[],
            input_name: "",
            input_author: "",
            input_publisher: "",
            input_detail: "",
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.detailItem = this.detailItem.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);


    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name_x = target.name;

        this.setState({[name_x]: value});
    }

    updateSearch(event){
        this.setState({id:event.target.value.substr(0,20)});
        this.setState({name:event.target.value.substr(0,20)});
        this.setState({author:event.target.value.substr(0,20)});
        this.setState({publisher:event.target.value.substr(0,20)});
    }



    deleteItem(event) {
        fetch('https://5c9017798447f30014cb83b1.mockapi.io/book/v1/'+event.target.id,{
            method:'DELETE'
        })
        alert(event.target.id+". ID deleted.");
    }



    homePage(){

        fetch('https://5c9017798447f30014cb83b1.mockapi.io/book/v1/')
            .then(response => response.json())
            .then(data => {
                this.setState({data: data })
            })


        let filteredData = this.state.data.filter(
            data => {
                return data.id.indexOf(this.state.id) >= 0 || data.name.indexOf(this.state.name) >= 0 ||
                    data.author.indexOf(this.state.author) >= 0 || data.publisher.indexOf(this.state.publisher) >= 0
            }
        );
        return <ul>

            <div className="title">
                <input placeholder="ID Search" type="text" className="search" onChange={this.updateSearch.bind(this)}/>
                <input placeholder="Book Name Search" type="text" className="search" onChange={this.updateSearch.bind(this)}/>
                <input placeholder="Author Name Search" type="text" className="search" onChange={this.updateSearch.bind(this)}/>
                <input placeholder="Publisher Name Search" type="text" className="search" onChange={this.updateSearch.bind(this)}/>
            </div>

            <li className='title'>
                <span>ID</span>
                <span>Book Name</span>
                <span>Author</span>
                <span>Publisher</span>
                <span>Detail</span>
                <span>Delete</span>
            </li>

            { filteredData.map(item => {
                return <li key={item.id} className='item'>
                    <span>{item.id}</span>
                    <span>{item.name}</span>
                    <span>{item.author}</span>
                    <span>{item.publisher}</span>
                    <span><Link to={"detail/"+item.id} >Detail</Link></span>
                    <span><Link id={item.id} onClick={this.deleteItem} >Delete</Link></span>

                </li>
            })
            }


        </ul>;

    }



    detailItem(){

        if(window.location.href.split('/')[3] !== "create"){
            fetch('https://5c9017798447f30014cb83b1.mockapi.io/book/v1/'+window.location.href.split('/')[4])
                .then(response => response.json())
                .then(detailData => {
                    this.setState({detailData: detailData })
                })
                .catch(err => console.error(this.props.url, err.toString()))

            let filteredData = [this.state.detailData].filter(
                detailData => {
                    return detailData
                }
            );

            return <ul>
                <li className='title'>
                    <span>ID</span>
                    <span>Book Name</span>
                    <span>Author</span>
                    <span>Publisher</span>
                    <span>Detail</span>
                </li>

                { filteredData.map(item => {
                    return <li key={item.id } className='item'>
                        <span>{item.id } </span>
                        <span>{item.name}</span>
                        <span>{item.author}</span>
                        <span>{item.publisher}</span>
                        <span>{item.detail}</span>

                    </li>
                })
                }
                <div><Link to="/" >Back to homepage</Link></div>
            </ul>;
        }
        else{
            return null
        }

    }

    createItem(){
        return (

            <form action="/">
                <table>
                <label>
                    Books Name :
                    <br/>
                    <input
                        placeholder="Book Name"
                        name="input_name"
                        type="text"
                        value={this.state.input_name}
                        onChange={this.handleInputChange} />
                </label>
                <br/>
                <label>
                    Author Name :
                    <br/>
                    <input
                        placeholder="Author Name"
                        name="input_author"
                        type="text"
                        value={this.state.input_author}
                        onChange={this.handleInputChange} />
                </label>
                <br/>
                <label>
                    Publisher Name :
                    <br/>
                    <input
                        placeholder="Publisher Name"
                        name="input_publisher"
                        type="text"
                        value={this.state.input_publisher}
                        onChange={this.handleInputChange} />
                </label>
                <br/>
                <label>
                    Detail :
                    <br/>
                    <input
                        placeholder="Detail"
                        name="input_detail"
                        type="text"
                        value={this.state.input_detail}
                        onChange={this.handleInputChange} />
                </label>
                <br/>
                <Link to={"/save/"+this.state.input_name+"/"+this.state.input_author+"/"+
                this.state.input_publisher+"/"+this.state.input_detail} >Send!</Link>
                </table>
            </form>


        );


    }


    shouldComponentUpdate(nextProp, nextState) {
        if(window.location.href.split('/')[3] === "save" ){
            return false
        }
        else{
            return true
        }

    }


    render() {
        return <div>

            <Router>

                <ul className="menu">
                <li><Link to="/" activeClassName="active">Home</Link></li>
                <li><Link to="/create" activeClassName="active">Create</Link></li>
                <li><Link to="/about" activeClassName="active">About</Link></li>
                </ul>

                <Route exact path="/" render={() => this.homePage()}/>
                <Route path="/detail/:id" render={() => this.detailItem()}/>
                <Route path="/create" render={() => this.createItem()}/>
                <Route path="/about" component={About}/>
                <Route path="/save/:name/:author/:publisher/:detail" component={SaveItem}/>
            </Router>

        </div>;
    }
}


export default App;