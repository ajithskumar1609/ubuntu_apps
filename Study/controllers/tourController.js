exports.getAllTour = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      tours,
    },
  });
};
exports.createTour = (req, res) => {
  console.log(req.body);
  const tour = req.body;
  res.status(201).json({
    status: 'Success',
    createTimeAt: req.requestTime,
    data: {
      tour,
    },
  });
};
exports.getTour = (req, res) => {
  //console.log(req.params);
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);
  //console.log(tour);
  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
};
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: '<update the tour>',
  });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
