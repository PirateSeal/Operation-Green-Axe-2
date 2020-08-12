exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('roles')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('roles').insert([
        { name: 'Team Leader', short: 'TL' },
        { name: 'Squad Leader', short: 'SL' },
        { name: 'Light Machine Gunner', short: 'LMG' },
        { name: 'Machine Gunner', short: 'MG' },
        { name: 'Anti Tank', short: 'AT' },
        { name: 'Anti Air', short: 'AA' },
        { name: 'Medic', short: 'MDC' },
        { name: 'Grenadier', short: 'GL' },
        { name: 'Marksman', short: 'MKS' },
        { name: 'Pilot', short: 'PL' },
        { name: 'Radioman', short: 'RD' },
        { name: 'Explosive Ordnance Disposal', short: 'EOD' },
      ]);
    });
};
