import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button, Container, Modal } from "react-bootstrap";

class Counter extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch("http://localhost:3000/posts")
      .then(res => res.json())
      .then(data => {
        this.props.get(data);
      });
  }

  update = recordToUpdate => {
    fetch("http://localhost:3000/updateposts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recordToUpdate)
    });
    window.location.reload();
  };

  addrecord = recordToAdd => {
    fetch("http://localhost:3000/addrecord", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recordToAdd)
    });
    window.location.reload();
  };

  deleterec = recToDelete => {
    let url = "http://localhost:3000/recToDelete/" + recToDelete;
    fetch(url, {
      method: "POST"
    });
    window.location.reload();
  };

  render() {
    return (
      <Container>
        <div style={{ paddingTop: 25 }}>
          <Button
            variant="primary"
            type="submit"
            onClick={this.props.modalShow1}
          >
            Add
          </Button>
          <Modal show={this.props.modal1}>
            <Modal.Header>
              <Modal.Title>Invoice Data:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Invoice ID :
              <input
                type="text"
                placeholder="Enter Invoice Id"
                name="Invoices_Id"
                onChange={this.props.onChangeadd}
              />
              <br />
              <br />
              Invoices Company :
              <input
                type="text"
                placeholder="Enter Invoice Company"
                name="Invoices_Company"
                onChange={this.props.onChangeadd}
              />
              <br />
              <br />
              Invoice Date :
              <input
                type="text"
                placeholder="Enter Invoice Date"
                name="Invoices_Date"
                onChange={this.props.onChangeadd}
              />
              <br />
              <br />
              Invoice Cost :
              <input
                type="text"
                placeholder="Enter Invoice Cost"
                name="Invoices_Cost"
                onChange={this.props.onChangeadd}
              />
              <br />
              <br />
              Invoice Discount :
              <input
                type="text"
                placeholder="Enter Invoice Discount"
                name="Invoices_Discount"
                onChange={this.props.onChangeadd}
              />
              <br />
              <br />
              <Button
                style={{ marginRight: "15px" }}
                variant="primary"
                type="submit"
                onClick={() => this.addrecord(this.props.addrecord)}
              >
                Save Changes
              </Button>
              {/* <div style = {{paddingTop : "15px"}}>{this.props.messageFromServer}</div> */}
              <Button
                variant="primary"
                type="submit"
                onClick={this.props.modalShow1}
              >
                Close
              </Button>
            </Modal.Body>
            <Modal.Footer />
          </Modal>
        </div>

        <div style={{ paddingTop: 25 }}>
          <Table striped bordered hover size="sm" responsive="sm">
            <TableHeader />
            <TableBody
              characterData={this.props.data}
              modalShow2={this.props.modalShow2}
              deleterec={this.deleterec}
            />
          </Table>
          <Modal show={this.props.modal2}>
            <Modal.Header>
              <Modal.Title>Invoice Data:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Invoice ID : {this.props.recordToUpdate.Invoices_Id}
              <br />
              <br />
              Invoices Company :
              <input
                type="text"
                placeholder={this.props.recordToUpdate.Invoices_Company}
                name="Invoices_Company"
                onChange={this.props.onChangeupdate}
              />
              <br />
              <br />
              Invoice Date :
              <input
                type="text"
                placeholder={this.props.recordToUpdate.Invoices_Date}
                name="Invoices_Date"
                onChange={this.props.onChangeupdate}
              />
              <br />
              <br />
              Invoice Cost :
              <input
                type="text"
                placeholder={this.props.recordToUpdate.Invoices_Cost}
                name="Invoices_Cost"
                onChange={this.props.onChangeupdate}
              />
              <br />
              <br />
              Invoice Discount :
              <input
                type="text"
                placeholder={this.props.recordToUpdate.Invoices_Discount}
                name="Invoices_Discount"
                onChange={this.props.onChangeupdate}
              />
              <br />
              <br />
              <Button
                style={{ marginRight: "15px" }}
                variant="primary"
                type="submit"
                onClick={() => this.update(this.props.rectoupdate)}
              >
                Save Changes
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={this.props.modalShow2}
              >
                Close
              </Button>
            </Modal.Body>
            <Modal.Footer />
          </Modal>
        </div>
      </Container>
    );
  }
}

const TableBody = props => {
  const rows = props.characterData.map(row => {
    return (
      <tr key={row.Invoices_Id} style={{ cursor: "pointer" }}>
        <td>{row.Invoices_Id}</td>
        <td>{row.Invoices_Company}</td>
        <td>{row.Invoices_Date}</td>
        <td>{row.Invoices_Cost}</td>
        <td>{row.Invoices_Discount}</td>
        <td>
          <Button
            style={{ marginRight: 5 }}
            type="button"
            onClick={() => props.modalShow2(row)}
          >
            Edit
          </Button>
          <Button
            type="button"
            onClick={() => props.deleterec(row.Invoices_Id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

const TableHeader = () => {
  return (
    <thead style={{ backgroundColor: "#1890ff", color: "white" }}>
      <tr>
        <th>Invoice No</th>
        <th>Company</th>
        <th>Date & Time</th>
        <th>Cost</th>
        <th>Dsicount (%)</th>
        <th>Edit</th>
      </tr>
    </thead>
  );
};

function mapStateToProps(state) {
  return {
    data: state.data,
    modal2: state.modal2,
    recordToUpdate: state.recordToUpdate,
    rectoupdate: state.rectoupdate,
    addrecord: state.addrecord,
    modal1: state.modal1
  };
}

function mapDispatchToProps(dispatch) {
  let recordToUpdate = [];

  return {
    get: data => {
      const action = { type: "GET", data };
      dispatch(action);
    },
    modalShow2: row => {
      recordToUpdate = row;
      const action = { type: "MODALSHOW2", recordToUpdate };
      dispatch(action);
    },
    onChangeupdate: event => {
      console.log("onchangeupdate event===", event);
      event.preventDefault();
      const name = event.target.name;
      const value = event.target.value;
      const action = { type: "ONCHANGEUPDATE", name, value };
      dispatch(action);
    },
    modalShow1: () => {
      const action = { type: "MODALSHOW1" };
      dispatch(action);
    },
    onChangeadd: event => {
      console.log("onchangeadd event===", event);
      event.preventDefault();
      const name = event.target.name;
      const value = event.target.value;
      const action = { type: "ONCHANGEADD", name, value };
      dispatch(action);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
