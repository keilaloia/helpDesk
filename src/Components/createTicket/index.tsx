import * as React from 'react';
import { TicketCard } from '../TicketCard/';

export const CreateTicket: React.SFC<{}> = () => {
        return (
            <>
            <h1>Create Ticket</h1>
            {/* dynamically create all of our tickets */}
                <TicketCard show="show" othershow= "hide"update ={false} />
            </>
        );
    
  };
