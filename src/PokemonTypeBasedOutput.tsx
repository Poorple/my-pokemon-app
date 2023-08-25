/* pokemon.map((poke: any) =>
              poke.type.map((x: string) =>
                filterType.includes(x) ? (
                  <article key={poke.id}>
                    {poke.id < 10 ? (
                      <img
                        key={poke.name.english}
                        src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/00${poke.id}.png`}
                        loading="lazy"
                      />
                    ) : poke.id < 100 ? (
                      <img
                        key={poke.name.english}
                        src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/0${poke.id}.png`}
                        loading="lazy"
                      />
                    ) : (
                      <img
                        key={poke.name.english}
                        src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${poke.id}.png`}
                        loading="lazy"
                      />
                    )}
                    <p key={poke.name} className="nameNhash">
                      {poke.name} #{poke.id}
                    </p>
                    <div key={poke.type} className="typebox">
                      {poke.type.map((kind: any) => (
                        <p
                          className={`type ${kind.toLowerCase()}`}
                          key={kind.id}
                        >
                          {kind}
                        </p>
                      ))}
                    </div>
                  </article> */

/* finalFilterList.map((poke: any) => (
                    <article key={poke.id}>
                      {poke.id < 10 ? (
                        <img
                          key={poke.name.english}
                          src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/00${poke.id}.png`}
                          loading="lazy"
                        />
                      ) : poke.id < 100 ? (
                        <img
                          key={poke.name.english}
                          src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/0${poke.id}.png`}
                          loading="lazy"
                        />
                      ) : (
                        <img
                          key={poke.name.english}
                          src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${poke.id}.png`}
                          loading="lazy"
                        />
                      )}
                      <p key={poke.name} className="nameNhash">
                        {poke.name} #{poke.id}
                      </p>
                      <div key={poke.type} className="typebox">
                        {poke.type.map((kind: any) => (
                          <p className={`type ${kind.toLowerCase()}`} key={kind.id}>
                            {kind}
                          </p>
                        ))}
                      </div>
                    </article> */

/* filteredPokemon &&
                      !filterType &&
                      filteredPokemon.map((item: any) => (
                        <article key={item.id}>
                          {item.id < 10 ? (
                            <img
                              key={item.name.english}
                              src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/00${item.id}.png`}
                              loading="lazy"
                            />
                          ) : item.id < 100 ? (
                            <img
                              key={item.name.english}
                              src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/0${item.id}.png`}
                              loading="lazy"
                            />
                          ) : (
                            <img
                              key={item.name.english}
                              src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${item.id}.png`}
                              loading="lazy"
                            />
                          )}
                          <p key={item.name} className="nameNhash">
                            {item.name} #{item.id}
                          </p>
                          <div key={item.type} className="typebox">
                            {item.type.map((kind: any) => (
                              <p
                                className={`type ${kind.toLowerCase()}`}
                                key={kind.id}
                              >
                                {kind}
                              </p>
                            ))}
                          </div>
                        </article>
                      ))
                    )
                  )}
              </article> */
