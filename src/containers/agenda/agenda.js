import React, {useState, useEffect} from 'react';
import { ReactAgenda , ReactAgendaCtrl , guid ,  Modal } from 'react-agenda';
import moment from 'moment';
import 'react-agenda/build/styles.css';
import 'react-datetime/css/react-datetime.css'; 
import {connect} from 'react-redux';
import {addNewRdv,deleteRdv, setRdv} from '../../api/rdvApi'
import {loadRdv} from '../../actions/rdv/rdvActions'

var colors= {
  'public':"rgba(102, 195, 131 , 1)" ,
  "private":"rgba(242, 177, 52, 1)" ,
  "color-3":"rgba(235, 85, 59, 1)"
}
 
var now = new Date();
 
var test = [
  {
    id            :guid(),
    _id            :guid(),
    name          : 'Meeting , dev staff!',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
    classes       : 'color-1'
  },
  {
   id            :guid(),
    _id            :guid(),
    name          : 'Working lunch , Holly',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 11, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 13, 0),
    classes       : 'color-2 color-3'
  },
 
];


const Agenda = (props)=> {
    const [items, setItems] = useState(test);
	const [selected, setSelected] = useState([]);
	const [cellHeight, setCellHeight] = useState(30);
	const [showModal, setShowModal] = useState(false);
	const [locale, setLocale] = useState("fr");
	const [rowsPerHour, setRowsPerHour] = useState(2);
	const [numberOfDays, setNumberOfDays] = useState(7);
	const [startDate, setStartDate] = useState(new Date());
	

	useEffect(()=>{
        let otherRdv = props.agenda.items;
        
        otherRdv.map((item)=>{
        	
        	item.startDateTime = new Date(item.startDateTime);
        	item.endDateTime = new Date(item.endDateTime);
        })

        let rdv = props.follow.items;
        rdv.map((item)=>{
            item.startDateTime= new Date(item.callDateTime)
            item.endDateTime= new Date(item.startDateTime.getFullYear(),item.startDateTime.getMonth(), item.startDateTime.getDate(),item.startDateTime.getHours()+1, item.startDateTime.getMinutes(),0)
            item.classes = "color-3"
            item.name=item.description
            item._id = item.id
            
        })
        console.log("other",otherRdv)
        console.log('follow', rdv)
        let allRdv = otherRdv.concat('all',rdv)
         
        console.log(allRdv)
        setItems(allRdv)
        
    }, [props])
    
    const handleCellSelection = (item)=>{
	  console.log('handleCellSelection',item)
	}
	const handleItemEdit = (item) =>{
      console.log('handleItemEdit', item)
      setSelected([item])
      setShowModal(true);
      
	}
	const handleRangeSelection = (item) =>{
	  console.log('handleRangeSelection', item)
	  setSelected(item);
	  setShowModal(true);
	  
    }
    
    const handleRemoveItem = (items, removeItem) => {
        console.log(removeItem)
        deleteRdv(removeItem,props.user.infos.id,removeItem._id).then((res)=> {
            if(res.status===200){
                props.loadRdv(items)
            }
        })
    }
	
	const addNewEvent = (items, newItem) =>{
        
        let data = {
			name: newItem.name,
			startDateTime: newItem.startDateTime.getFullYear()+'-'+(newItem.startDateTime.getMonth() + 1)+"-"+newItem.startDateTime.getDate()+' '+newItem.startDateTime.getHours()+':'+newItem.startDateTime.getMinutes(),
			endDateTime: newItem.endDateTime.getFullYear()+'-'+(newItem.endDateTime.getMonth() + 1)+"-"+newItem.endDateTime.getDate()+' '+newItem.endDateTime.getHours()+':'+newItem.endDateTime.getMinutes(),
			classes: newItem.classes,
			user_id: props.user.infos.id,
			_id: newItem._id
        }
        console.log(data)
        addNewRdv(data,props.user.infos.id).then((res)=>{
            if(res.status===200){
                props.loadRdv(items)
                setShowModal(false)
            }
           
        })
	}
	
	const editEvent = (items, newItem) =>{
        let data = {
			name: newItem.name,
			startDateTime: newItem.startDateTime.getFullYear()+'-'+(newItem.startDateTime.getMonth() + 1)+"-"+newItem.startDateTime.getDate()+' '+newItem.startDateTime.getHours()+':'+newItem.startDateTime.getMinutes(),
			endDateTime: newItem.endDateTime.getFullYear()+'-'+(newItem.endDateTime.getMonth() + 1)+"-"+newItem.endDateTime.getDate()+' '+newItem.endDateTime.getHours()+':'+newItem.endDateTime.getMinutes(),
			classes: newItem.classes,
			user_id: props.user.infos.id,
			_id: newItem._id
        }
        console.log(data)
        setRdv(data).then((res)=>{
            if(res.status===200){
                props.loadRdv(items)
                setShowModal(false)
            }
           
        })
		
	}
    
    return (
        <div>
            <h2>Mon agenda</h2>
            { showModal &&
	          <Modal clickOutside={()=>setShowModal(false)} >

	            <div className="modal-content">
	              <ReactAgendaCtrl
	                items={items}
	                itemColors={colors}
	                selectedCells={selected}
	                Addnew={addNewEvent}
	               edit={editEvent}  />
	            </div>

	        </Modal>
			}

            <ReactAgenda
	          minDate={now}
	          maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
	          disablePrevButton={false}
	          startDate={startDate}
	          cellHeight={cellHeight}
	          locale={locale}
	          items={items}
	          numberOfDays={numberOfDays}
	          rowsPerHour={rowsPerHour}
	          itemColors={colors}
	          autoScale={false}
	          fixedHeader={true}
	          onItemEdit={handleItemEdit}
	          onCellSelect={handleCellSelection}
              onRangeSelection={handleRangeSelection}
              onItemRemove={handleRemoveItem}
	        />
        </div>    
    )   
}

const mapStateToProps = (store)=>{
	return {
        agenda: store.rdv,
        user: store.user,
        follow: store.follow
	}
}

const mapDispatchToProps = {
    loadRdv
}

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);