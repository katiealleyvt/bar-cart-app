const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('db');

module.exports = defaultConfig;

async function openDatabase(pathToDatabaseFile) {
    const directoryExists = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite');
    if (!directoryExists.exists) {
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
    await FileSystem.downloadAsync(
      Asset.fromModule(require(pathToDatabaseFile)).uri,
      FileSystem.documentDirectory + 'SQLite/cocktaildb.db'
    );
    return SQLite.openDatabase('cocktaildb.db');
  }
  