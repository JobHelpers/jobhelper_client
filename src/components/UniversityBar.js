import React from "react";
// import observer

const Bar = () => {
   return(
    <Container>
       <ListGroup>
        {university.map(type => 
           <ListGroup.Item
           style={{cursor: 'pointer'}}
           active={type.id === university.setSelectedType.id}
           onclick={() => university.setSelectedType(type)} 
           key={type.id}>
              {type.name}
           </ListGroup.Item>
        )}
     </ListGroup>
       
       <Row>
           <Col md={9}>

           </Col>
       </Row>
       // setSelectedType()    

    </Container>

   )
}
{/* 
   setSelectedType(type){
      return this._selectedType = type
   
   }
   get selectedType(){
       return this._selectedType
   }



   this._selectedType


*/}

