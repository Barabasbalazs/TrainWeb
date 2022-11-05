import trainCrudService from '../services/train-crud-services.js';

const {
  asyncDeleteTrain, asyncInsertTrain, asyncGetAll, asyncSearchTrain,
  asyncSearchPartialFrom, asyncSearchPartialTo,
} = trainCrudService;

const deleteTrain = (req, res) => {
  const respObj = {
    error: false,
  };
  asyncDeleteTrain(req.body.trainid)
    .then(() => {
      respObj.error = false;
      res.send(respObj);
    })
    .catch(() => {
      respObj.error = true;
      res.send(respObj);
    });
};

const insertTrain = (req, res) => {
  const respObj = {
    error: false,
  };
  asyncInsertTrain(req.body)
    .then(() => {
      res.send(respObj);
    })
    .catch(() => {
      respObj.error = true;
      res.send(respObj);
    });
};

const searchTrain = (req, res) => {
  const trainObj = {
    from: req.query.from,
    to: req.query.to,
    minprice: req.query.min,
    maxprice: req.query.max,
  };
  const respObj = {
    found: '',
    error: false,
  };
  if (req.query.from === '' && req.query.to !== '') {
    asyncSearchPartialTo(trainObj)
      .then((found) => {
        respObj.found = found;
        // res.send(found);
        res.send(respObj);
      })
      .catch(() => {
        respObj.error = true;
        res.send(respObj);
      });
  } else if (req.query.from !== '' && req.query.to === '') {
    asyncSearchPartialFrom(trainObj)
      .then((found) => {
        respObj.found = found;
        // res.send(found);
        res.send(respObj);
      })
      .catch(() => {
        respObj.error = true;
        res.send(respObj);
      });
  } else {
    asyncSearchTrain(trainObj)
      .then((found) => {
        respObj.found = found;
        res.send(respObj);
      })
      .catch(() => {
        respObj.error = true;
        res.send(respObj);
      });
  }
};

const getEveryTrain =  (req, res) => {
  const respObj = {
    lines: '',
  };
  asyncGetAll()
    .then((trains) => {
      respObj.lines = trains;
      respObj.error = false;
      res.send(respObj);
    })
    .catch(() => {
      respObj.error = true;
      res.send(respObj);
    });
};

export default {
  deleteTrain,
  insertTrain,
  searchTrain,
  getEveryTrain,
};
