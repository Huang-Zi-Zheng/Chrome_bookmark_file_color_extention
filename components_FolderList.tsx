import React from 'react'

interface Folder {
  id: string
  title: string
  color?: string
}

interface FolderListProps {
  folders: Folder[]
  onFolderSelect: (folder: Folder) => void
  selectedFolder: Folder | null
}

export default function FolderList({ folders, onFolderSelect, selectedFolder }: FolderListProps) {
  return (
    <div className="max-h-60 overflow-y-auto mb-4">
      {folders.map((folder) => (
        <div
          key={folder.id}
          className={`flex items-center p-2 cursor-pointer ${
            selectedFolder?.id === folder.id ? 'bg-gray-200' : ''
          }`}
          onClick={() => onFolderSelect(folder)}
        >
          <div
            className="w-5 h-5 mr-2 border border-gray-300"
            style={{ backgroundColor: folder.color || '#ffffff' }}
          ></div>
          <span>{folder.title}</span>
        </div>
      ))}
    </div>
  )
}

