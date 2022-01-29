import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Message from "../layout/Message";
import Container from '../layout/Container';
import Loading from '../layout/Loading';
import LinkButton from '../layout/LinkButton';
import ProjectCard from '../project/ProjectCard';

import styles from './Projects.module.css';

function Projects() {

    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setTimeout(() => {
                    setProjects(data);
                    setRemoveLoading(true);
                }, 300);
            })
            .catch(err => console.log(err));
    }, []);

    const location = useLocation();
    let message = '';

    if (location.state) {
        message = location.state.message
    }

    async function removeProject(id) {
        const response = await fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = response.json();

        setProjects(projects.filter(project => project.id !== id));
        setProjectMessage('Projeto removido com sucesso!');
    }

    return (
        <div className={styles.projectContainer}>
            <div className={styles.titleContainer}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newProject" text="Criar Projeto" />
            </div>
            {message && <Message msg={message} type="success" />}
            {projectMessage && <Message msg={projectMessage} type="success" />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map(project => {
                        return (
                            <ProjectCard
                                name={project.name}
                                id={project.id}
                                budget={project.budget}
                                category={project.category.name}
                                key={project.id}
                                handleRemove={removeProject}
                            />
                        )
                    })
                }
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados</p>
                )}
            </Container>
        </div>
    )
}

export default Projects;