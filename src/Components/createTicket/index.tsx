import * as React from 'react';
import "./ticket.css"
import { TicketCard } from '../../TicketCard/index';

export const CreateTicket: React.SFC<{}> = () => {
        return (
            <>
            {/* dynamically create all of our tickets */}
                <TicketCard show="show" othershow= "hide"update ={false} />
            </>
        );
    
  };
