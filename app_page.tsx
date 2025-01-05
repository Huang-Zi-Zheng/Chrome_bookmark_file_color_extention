'use client'

import { useState, useEffect } from 'react'
import ColorPicker from '../components/ColorPicker'
import FolderList from '../components/FolderList'

export default function Popup() {
  const [folders, setFolders] = useState([])
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [selectedColor, setSelectedColor] = useState('#ffffff')

  useEffect(() => {
    // Load bookmark folders
    if (typeof chrome !== 'undefined' && chrome.bookmarks) {
      chrome.bookmarks.getTree((bookmarkTreeNodes) => {
        const folderList = []
        function traverseBookmarks(nodes) {
          for (const node of nodes) {
            if (node.children) {
              folderList.push(node)
              traverseBookmarks(node.children)
            }
          }
        }
        traverseBookmarks(bookmarkTreeNodes)
        setFolders(folderList)
      })
    }
  }, [])

  const handleFolderSelect = (folder) => {
    setSelectedFolder(folder)
  }

  const handleColorChange = (color) => {
    setSelectedColor(color)
  }

  const handleApplyColor = () => {
    if (selectedFolder && typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.set({ [selectedFolder.id]: selectedColor }, () => {
        setFolders(folders.map(folder => 
          folder.id === selectedFolder.id ? {...folder, color: selectedColor} : folder
        ))
        chrome.runtime.sendMessage({ 
          type: 'updateBookmarkColor', 
          folderId: selectedFolder.id, 
          color: selectedColor 
        })
      })
    }
  }

  return (
    <div className="container p-4 w-80">
      <h1 className="text-2xl font-bold mb-4">Bookmark Folder Colorizer</h1>
      <FolderList 
        folders={folders} 
        onFolderSelect={handleFolderSelect} 
        selectedFolder={selectedFolder}
      />
      <ColorPicker 
        color={selectedColor} 
        onColorChange={handleColorChange} 
        onApplyColor={handleApplyColor}
      />
    </div>
  )
}

