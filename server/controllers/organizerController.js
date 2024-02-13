
const { Match } = require('../models/matchModel')



const createRound = async (req, res) => {
  try {
    const matchId = req.params.matchId;
    const roundNo = req.params.roundNo;

    // Find the match by its matchId field
    const match = await Match.findOne({ matchId: matchId });

    if (!match) {
      console.log("match not found")
      return res.status(404).json({ error: 'Match not found' });
    }

    // Check if the round with the specified roundNumber already exists
    const existingRoundIndex = match.rounds.findIndex(round => round.roundNumber === parseInt(roundNo, 10));

    console.log(existingRoundIndex);

    if (existingRoundIndex !== -1) {
      console.log("Already exists round");

      // If roundNumber exists, update the existing round
      const currentRound = match.rounds[existingRoundIndex];

      if (parseInt(roundNo, 10) === 1) {
        // For the first round, use the original teams
        currentRound.pairs = createPairs(match.teams || []);
      } else {
        // For subsequent rounds, use the winners from the previous round
        const previousRoundIndex = existingRoundIndex - 1;

        if (previousRoundIndex >= 0 && match.rounds[previousRoundIndex].winners) {
          currentRound.pairs = createPairs(match.rounds[previousRoundIndex].winners);
        } else {
          console.log("Error: Winners not found for the previous round");
          return res.status(400).json({ error: 'Winners not found for the previous round' });
        }
      }
    } else {
      console.log("New round : ", roundNo);

      // If roundNumber does not exist, insert a new round
      let pairsArray;

      if (roundNo == 1) {
        // For the first round, use the original teams
        pairsArray = createPairs(match.teams || []);
        console.log(pairsArray)
      } else {
        // For subsequent rounds, use the winners from the previous round
        const previousRoundIndex = roundNo - 2;

        if (previousRoundIndex >= 0 && match.rounds[previousRoundIndex].winners) {
          pairsArray = createPairs(match.rounds[previousRoundIndex].winners);
        } else {
          console.log("Error: Winners not found for the previous round.");
          return res.status(400).json({ error: 'Winners not found for the previous round.' });
        }
      }
      
      match.rounds.push({
        roundNumber: roundNo,
        pairs: pairsArray,
      });
    }

    // Update the match with the modified rounds
    const updatedMatch = await match.save();
    console.log("new match : ", updatedMatch)

    res.json(updatedMatch);
  } catch (error) {
    console.error('Round creation error:', error);
    res.status(500).json({ error: 'Round creation error', details: error.message });
  }
};



/*
const getPairs = (req, res) => {
  try {

    const roundName = req.query.round; // Extract the round parameter from the request query
    console.log("req success : ", roundName)

    if (roundName == 1) {

      const pair = createPairs(teams);

      console.log('round1 : ', pair);
      res.json({ pairs: pair });

    } else {
      const data = fs.readFileSync(winnersPath);
      const parsedData = JSON.parse(data);
      const teams = parsedData[roundName - 1];
      const pair = createPairs(teams);
      //console.log('parseData : ', parsedData);
      console.log('round : ', pair);
      res.json({ pairs: pair });
    }
  } catch (error) {
    console.error('Error pair creation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
*/


const createPairs = (array) => {
  const pairs = [];

  for (let i = 0; i < array.length; i += 2) {
    if (i + 1 < array.length) {
      pairs.push([array[i], array[i + 1]]);
    } else {
      pairs.push([array[i]]);
    }
  }

  return pairs;
};


const getWinners = async (req, res) => {
  try {
    const matchId = req.params.matchId;
    console.log(matchId);
    const match = await Match.findOne(
      {matchId:matchId}
    )
    console.log(match)
    res.json({match:match})

  } catch (error) {
    console.log("reading match for winners error : ", error)
  }
}



const setWinners = async (req, res) => {
  try {
    const matchId = req.params.matchId;
    const roundNo = req.params.roundNo;
    const winnersArray = req.body.winnersArray;
    console.error('winners:', winnersArray);

    let match = await Match.findOneAndUpdate(
      { matchId: matchId, 'rounds.roundNumber': roundNo },
      {
        $set: {
          'rounds.$.winners': winnersArray,
        },
      },
      { new: true }
    );

    if (winnersArray.length === 1) {
      match = await Match.findOneAndUpdate(
        { matchId: matchId },
        {
          $pull: {
            rounds: { roundNumber: { $gt: roundNo } },
          },
        },
        { new: true }
      );

      return res.json({ message: "final winner already selected", finalWinner: winnersArray[0] })
    }

    res.json(match);
  } catch (error) {
    console.error('Error saving winners:', error);
    res.status(500).json({ error: 'Error saving winners' });
  }
};





module.exports = { getWinners, setWinners, createRound }