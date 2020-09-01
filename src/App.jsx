const contentNode = document.getElementById('contents');

class IssueFilter extends React.Component {
  render() {
    return (
      <div>This is a placeholder for the Issue Filter.</div>
    )
  }
}

const IssueRow = (props) =>(  
    // const borderedStyle = {border: "1px solid silver", padding: 4};
      <tr>
        <td>{props.issue.id}</td>
        <td>{props.issue.status}</td>
        <td>{props.issue.owner}</td>
        <td>{props.issue.created.toDateString()}</td>
        <td>{props.issue.effort}</td>
        <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
        <td>{props.issue.title}</td>
      </tr>
)


 function IssueTable(props){//only a render()
 
    // const borderedStyle = {border: "1px solid silver", padding: 6};
    const issueRows = props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />) 
    //^^^ takes in the issues array of objects. iterates through each object of the array and
    //creates an instance of the IssueRow class with that array index's contents. In this case it would be the first issue object and the second issue object. This gives the IssueRow class
    // access to each of the issue object properties.
    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Effort</th>
            <th>Completion Date</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>{issueRows}</tbody>
      </table>
    );
  }


class IssueAdd extends React.Component { //interactivity but no state
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    var form = document.forms.issueAdd;
    this.props.createIssue({
      owner: form.owner.value,
      title: form.title.value,
      status: "New",
      created: new Date(),
    });
    //clear form for next input
    form.owner.value = ""; form.title.value = "";
  }

  render() {
    return (
      <form name="issueAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="owner" placeholder="Owner"/>
        <input type="text" name="title" placeholder="Title"/>
        <button>Add</button>
      </form>
    )
  }
}

const issues =[
  {
    id: 1, status: "Open", owner: "Allef",
    created: new Date("2020-10-20"),
    effort: 5,
    completionDate: undefined,
    title: "Error in console when clicking Add",
  },
  {
    id: 2,
    status: "Assigned",
    owner: "Bob",
    created: new Date("2010-02-20"),
    effort: 14,
    completionDate: new Date("2015-04-10"),
    title: "Missing bottom border panel",
  },
];

class IssueList extends React.Component { //Has a state, lots of methods, initialization, and functions that modify the state
  constructor(){
    super(); //what happens here?
    this.state = {issues: []}; //this.state basically says that the current state is equal to the whatever we define in the object
    //In this case, we have set the starting and current state as the array Issues.
    this.createIssue = this.createIssue.bind(this) //we need to bind here or else it will use the *this* variable from the new createIssue
    //because it will be used in another method. 
    //and not the one from the constuctor. Then waits 2 seconds
  }

  componentDidMount(){
    this.loadData();
  }

  loadData(){
    setTimeout(() =>{ //arrow function already uses the *this* keyword
      this.setState({issues: issues});
    }, 500);
  }

  createIssue(newIssue){
    const newIssues = this.state.issues.slice(); //copy of issues array
    newIssue.id = this.state.issues.length + 1;
    newIssues.push(newIssue); //added new issue to copy
    this.setState({issues: newIssues}); //changes the state, thus rerendering the page because a state was changed
  }

  render() {
    return (
      <div>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </div>
    );
  }
}


ReactDOM.render(<IssueList />, contentNode);    // Render the component inside the content Node