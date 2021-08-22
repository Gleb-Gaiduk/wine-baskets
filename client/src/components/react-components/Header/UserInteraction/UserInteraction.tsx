import WineBasketIcon from '../../../icon-components/WineBasketIcon';
import './user-interaction.css';

export interface UserInteractionProps {}

const UserInteraction = (props: UserInteractionProps) => {
  return (
    <div className='user-interaction'>
      <div className='user-interaction__login'>Login / Register</div>
      <div className='user-interaction__basket'>
        <WineBasketIcon width='40' height='40' />
      </div>
    </div>
  );
};

export default UserInteraction;
