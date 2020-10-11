const plugins = require('./plugins.json');

module.exports = function(ruleKey) {
  const [pluginName, ruleName] = ruleKey.split('/');

  if (!ruleName) {
    return {
      exactMatch: true,
      url: 'https://eslint.org/docs/rules/' + ruleKey
    };
  }

  const found = plugins[pluginName];

  if (!found) {
    throw new Error('No documentation found for rule');
  }

  if (found.docs) {
    return {
      exactMatch: true,
      url: `${found.docs}${ruleName}.md`
    };
  }

  if (found.repository) {
    return {
      exactMatch: false,
      url: found.repository
    };
  }

  throw new Error('No documentation found for rule');
};
