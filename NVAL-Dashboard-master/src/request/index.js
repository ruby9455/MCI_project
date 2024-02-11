// const domainUrl = 'http://localhost:3000';
const domainUrl = '';

const getInfrastructuresList = () => {
    return new Promise((resolve, reject) => {
        fetch(`${domainUrl}/infrastructures-list`).then(res => {
            return res.json();
        }).then(res => {
            if (res.code === 0) {
                resolve(res.data);
            }
        }).catch(e => {

        });
    })
};

const submitInfrastructuresList = data => {
    fetch(`${domainUrl}/update-infrastructures-list`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {
        return res.json();
    }).catch(e => {

    });
}

const getExperimentsList = () => {
    return new Promise((resolve, reject) => {
        fetch(`${domainUrl}/experiments-list`).then(res => {
            return res.json();
        }).then(res => {
            if (res.code === 0) {
                resolve(res.data);
            }
        }).catch(e => {

        });
    })
};

const submitExperimentsList = data => {
    fetch(`${domainUrl}/update-experiments-list`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {
        return res.json();
    }).catch(e => {

    });
}

export {
    getInfrastructuresList,
    submitInfrastructuresList,
    getExperimentsList,
    submitExperimentsList
}