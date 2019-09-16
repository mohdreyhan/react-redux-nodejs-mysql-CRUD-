const initialState = {
  count: 0,
  data: [],
  modal2: false,
  recordToUpdate: [],
  rectoupdate: [],
  addrecord : {
    Invoices_Id : 'enter',
    Invoices_Company : 'enter',
    Invoices_Date : 'enter',
    Invoices_Cost : 'enter',
    Invoices_Discount : 'enter'
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET":
      return Object.assign({}, state, {
        data: action.data
      });
    case "MODALSHOW2":
      return Object.assign({}, state, {
        modal2: !state.modal2,
        recordToUpdate: action.recordToUpdate,
        rectoupdate: action.recordToUpdate
      });
    case "ONCHANGEUPDATE":
      return {
        ...state,
        rectoupdate: {
          ...state.rectoupdate,
          [action.name]: action.value
        }
      };
    case "MODALSHOW1" : 
    return  Object.assign({}, state, {
      modal1: !state.modal1
    });
    case "ONCHANGEADD":
        return {
          ...state,
          addrecord: {
            ...state.addrecord,
            [action.name]: action.value
          }
        }
    default:
      return state;
  }
};

export default reducer;
