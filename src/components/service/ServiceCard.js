import { BsFillTrashFill } from 'react-icons/bs';

import styles from '../project/ProjectCard.module.css';

export default function ServiceCard({ id, name, cost, description, handleRemove }) {

    function remove(e) {
        e.preventDefault();
        handleRemove(id, cost);
    }

    return (
        <div className={styles.projectCard}>
            <h4>{name}</h4>
            <p>
                <span>Custo total:</span> R$ {cost}
            </p>
            <p>{description}</p>
            <div className={styles.projectCardActions}>
                <button onClick={remove}>
                    <BsFillTrashFill />
                    Excluir
                </button>
            </div>
        </div>
    );
}