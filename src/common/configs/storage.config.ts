import * as path from 'path';

export const pathUpload = (value) => {
  return path.resolve('upload', value);
} 

export const storageConfig = {
  config: {
    default: 'local',
    disks: {
      local: {
        driver: 'local',
        config: {
          root: path.resolve(__dirname, `../../../upload`)
        }
      }
    }
  }
}