import React from 'react'
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import './App.css'
import Canvas from "./canvas";
import Clock from "./clock";
import Hero from "./hero";
import useClocks from "./hooks/useClocks"

function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });
  const persister = createSyncStoragePersister({
    storage: window.localStorage,
  });


  const Clocks = () => {
    const { status, data, error, isFetching } = useClocks();
    return (
      <div className="main">
      { status === "loading" ? (
        "Loading..."
      ) : error instanceof Error ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div className="app">
          
            { data?.data.clocks &&
              data.data.clocks.length > 0 ?
                data.data.clocks.map(
                    cl => <Clock
                      id={cl.id}
                      key={cl.id}
                      backgroundColour={cl.backgroundColour}
                      backgroundImage={cl.backgroundImage}
                      startTime={cl.startTime}
                      event={cl.event}
                      />
                    )
            :(
            <div>NOPE</div>
            )}
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
    )
  }
  


  return (
    <>
    <div className="bg-container">
          <Canvas
          resolution={1000}
          scale={200}
          speed={5}/>
      </div>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <Hero />
        <Clocks/>
      </PersistQueryClientProvider>
    </>
  );
}

export default App
