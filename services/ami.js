const Nami = require('nami');
const Aio = require('asterisk.io');


module.exports = {
  namiA(req, res) {
    const ami = Aio.ami('201.45.162.170', 5038, 'freddy', 'luanda001');
    let asteriskOut =  null;

    
    const namiConfig = {
      host: "voip.credflash.com.br",
      port: 5038,
      username: 'freddy',
      secret: 'luanda001',
    };
    
    // const nami = new (require("nami").Nami)(namiConfig);
    // console.log(action);
    // // nami.on('namiEvent', function (event) { });
    // // nami.on('namiEventDial', function (event) { });
    // // nami.on('namiEventVarSet', function (event) { });
    // // nami.on('namiEventHangup', function (event) { });
    // process.on('SIGINT', function () {
      //   nami.close();
      //   process.exit();
      // });
      // const action = new Nami.Actions.ExtensionState('3499', 'from-internal');
      // nami.on('namiConnected', function (event) {
        //   nami.send(action, function (response) {
          //     console.log(' ---- Response: ' + (response));
          //     return res.json(response);
          //   });
          // });
          // nami.open();
          
          ami.on('error', (err) => { throw err });
          
          ami.on('ready', () => { console.log('conectado!') });
          
          ami.on('eventAny', (data) => {
            console.log(data.Event, data);
            asteriskOut = data;
            
          });
          
          return res.json(asteriskOut);

  }


};