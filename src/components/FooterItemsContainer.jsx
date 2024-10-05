import Item from './Item';
import { COMMUNITY, LEGAL, SUPPORT, ABOUT} from '../Data/Content';

const FooterItemsContainer = () => 
{
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">
            <Item title="ABOUT" Links={ABOUT}/>
            <Item title="COMMUNITY" Links={COMMUNITY}/>
            <Item title="SUPPORT" Links={SUPPORT}/>
            <Item title="LEGAL" Links={LEGAL}/>
        </div>
    );
};

export default FooterItemsContainer;